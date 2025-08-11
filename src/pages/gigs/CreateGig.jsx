import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus, X, Upload } from "lucide-react";
import { categories } from "../../data/dummyData";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import axiosInstance from "../../utils/axiosInstance";

const schema = yup.object({
  title: yup.string().required("Title is required").min(10),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required").min(50),
  price: yup.number().required().min(5),
  deliveryTime: yup.number().required().min(1),
  features: yup
    .array()
    .of(yup.string().required())
    .min(1, "Add at least one feature"),
});

const CreateGig = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([""]);
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { features: [""] },
  });

  const addFeature = () => setFeatures((prev) => [...prev, ""]);
  const removeFeature = (index) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
    setValue("features", updated);
  };
  const updateFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
    setValue("features", updated);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    if (images.length + newImages.length > 5) {
      alert("You can upload up to 5 images.");
      return;
    }

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("deliveryTime", data.deliveryTime);
      data.features.forEach((f, i) => formData.append(`features[${i}]`, f));
      images.forEach((imgObj) => formData.append("images", imgObj.file));

      await axiosInstance.post("/gigs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Gig created successfully!");
      navigate("/dashboard/my-gigs");
    } catch (err) {
      console.error("❌ Gig creation failed:", err);
      alert("Failed to create gig. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6">Create a New Gig</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Title */}
            <div>
              <label className="form-label">Gig Title *</label>
              <input {...register("title")} className="input-field" placeholder="I will design..." />
              {errors.title && <p className="form-error">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="form-label">Category *</label>
              <select {...register("category")} className="input-field">
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <p className="form-error">{errors.category.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="form-label">Description *</label>
              <textarea {...register("description")} rows={5} className="input-field" />
              {errors.description && <p className="form-error">{errors.description.message}</p>}
            </div>

            {/* Features */}
            <div>
              <label className="form-label">What you'll include *</label>
              {features.map((f, i) => (
                <div key={i} className="flex gap-2 items-center mb-2">
                  <input
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    className="input-field"
                    placeholder="e.g. Responsive design"
                  />
                  {features.length > 1 && (
                    <button type="button" onClick={() => removeFeature(i)} className="text-red-500">
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addFeature} className="text-blue-600 mt-2 flex items-center gap-1">
                <Plus size={16} /> Add Feature
              </button>
              {errors.features && <p className="form-error">{errors.features.message}</p>}
            </div>

            {/* Price & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Price (USD) *</label>
                <input {...register("price")} type="number" className="input-field" />
                {errors.price && <p className="form-error">{errors.price.message}</p>}
              </div>
              <div>
                <label className="form-label">Delivery Time (days) *</label>
                <input {...register("deliveryTime")} type="number" className="input-field" />
                {errors.deliveryTime && <p className="form-error">{errors.deliveryTime.message}</p>}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="form-label">Upload Images (max 5)</label>
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((imgObj, idx) => (
                    <div key={idx} className="relative">
                      <img src={imgObj.preview} alt={`Gig image ${idx + 1}`} className="w-full h-32 object-cover rounded-lg" />
                      <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                {images.length < 5 && (
                  <label className="block border-2 border-dashed p-6 text-center rounded cursor-pointer text-gray-500">
                    <Upload className="mx-auto mb-2" />
                    <span>Upload Images</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => navigate("/dashboard")} className="btn-secondary">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                {loading && <LoadingSpinner size="sm" />}
                {loading ? "Creating..." : "Create Gig"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateGig;
