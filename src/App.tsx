import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CreateCompany from "./pages/CreateCompany";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/dashboard/MainLayout";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";

// Desc: Main App component for the application.
function App() {
	const location = useLocation();
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Navigate
						to="/dashboard"
						state={{ from: location }}
						replace
					/>
				}
			/>

			<Route
				path="login"
				element={<LoginPage />}
			/>

			<Route
				path="signup"
				element={<SignUpPage />}
			/>

			<Route
				path="/company/:employerId?"
				element={<CreateCompany />}
			/>

			<Route
				path="dashboard"
				element={<ProtectedRoutes />}
			>
				<Route
					path=""
					element={<MainLayout />}
				>
					<Route
						path=""
						element={<Dashboard />}
					/>
					<Route
						path="profile"
						element={<Profile />}
					/>
				</Route>
			</Route>

			{/* 404 */}
			<Route
				path="*"
				element={<>404</>}
			/>
		</Routes>
	);
}

export default App;
