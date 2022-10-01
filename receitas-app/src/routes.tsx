import { Container } from "react-bootstrap";
import { 
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import { Header } from "./components/header/Header";
import { Administrator } from "./pages/administrator/Administrator";
import { Chef } from "./pages/chef/Chef";
import { Login } from "./pages/login/Login";
import AppProvider from "./shared/contexts/appContext";

export function AppRoutes() {
    return (
        <Router>
            <AppProvider>
                <Header />
                <Container>
                    <Routes>
                        <Route path="/*" element={<Login/>}></Route>
                        <Route path="/admin" element={<Administrator/>}></Route>
                        <Route path="/chef" element={<Chef/>}></Route>
                    </Routes>
                </Container>
              
            </AppProvider>
        </Router>
    )
}