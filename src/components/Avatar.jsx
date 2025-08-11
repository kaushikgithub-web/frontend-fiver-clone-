// components/Avatar.jsx
const Avatar = ({ name, avatarUrl }) => {
  const fallbackUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;

  return (
    <img
      src={avatarUrl || fallbackUrl}
      alt="User Avatar"
      className="w-12 h-12 rounded-full object-cover"
    />
  );
};

export default Avatar;
