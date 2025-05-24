import PopularHotels from "../../components/report/PopularHotels.jsx";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { useUser } from "../../shared/hooks";

export const PopularHotelsPage = () => {
    const {role} = useUser()
    
  return (
    <>
      <ResponsiveAppBar role={role} />
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <PopularHotels />
      </div>
    </>
  );
}