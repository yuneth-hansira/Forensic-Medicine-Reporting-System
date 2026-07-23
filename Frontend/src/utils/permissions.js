export const canCreate = (user) => {
  if (!user) return false;
  const role = user.Role || user.role;
  const accessLevel = user.Access_Level || user.access_level;
  if (role === 'Admin') return true;
  if (role === 'Doctor') return false;
  return ['Standard', 'Elevated', 'Full'].includes(accessLevel);
};

export const canEdit = (user) => {
  if (!user) return false;
  const role = user.Role || user.role;
  const accessLevel = user.Access_Level || user.access_level;
  if (role === 'Admin') return true;
  if (role === 'Doctor') return false;
  return ['Elevated', 'Full'].includes(accessLevel);
};

export const canDelete = (user) => {
  if (!user) return false;
  const role = user.Role || user.role;
  const accessLevel = user.Access_Level || user.access_level;
  if (role === 'Admin') return true;
  if (role === 'Doctor') return false;
  return accessLevel === 'Full';
};
