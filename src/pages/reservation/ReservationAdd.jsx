import ReserAdd from "../../components/reservation/ReservationAdd.jsx"
import { ResponsiveAppBar } from '../../components/Navbar';

export default function ReservationAddPage() {
    return (
        <>
        <ResponsiveAppBar />
        <div style={{ padding: '100px', textAlign: 'center' }}>
            
            <ReserAdd />
        </div>
        </>
    );
}