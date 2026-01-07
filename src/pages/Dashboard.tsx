import { useAuthStore } from "../store/auth.store";

const Dashboard = () => {
    const user = useAuthStore((state)=> state.user);
  return (
    <>
      <h2>Welcome to Dashboard</h2>
      <p>{user?.email}</p>
    </>
  );
};

export default Dashboard;
