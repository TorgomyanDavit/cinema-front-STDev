import { Navigate, Outlet } from 'react-router-dom'

const UserRouteProvider = () => {
    const auth = true

    return (
        <div>
            {
                auth ? <Outlet /> : <Navigate to='/' />
            }
        </div>
    )
}

export default UserRouteProvider
