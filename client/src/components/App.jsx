import CustomersPage from '../pages/CustomersPage';
import { Route, Routes } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import AppLayOut from './AppLayOut';
import HomePage from '../pages/HomePage';
import UsersPage from '../pages/UsersPage'
import EditUsers from '../components/EditUsers';
import EditClients from '../components/EditClients';

import { ViewProvider } from '../contexts/ViewContext';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProtectedRoute from './ProtectedRoute';

const queryClient = new QueryClient()

export default function App() {


    return <QueryClientProvider client={queryClient}>
        <ViewProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />

                    <Route element={<ProtectedRoute roles={['admin', 'employee']} />}>
                        <Route element={<AppLayOut />}>
                            <Route path="home" element={<HomePage />} />

                            <Route path='users' element={<ProtectedRoute roles={['admin']} />}>
                                <Route index element={<UsersPage />} />
                                <Route path="register" element={<Register />} />
                                <Route path=":id" element={<EditUsers />} />
                            </Route>

                            <Route path="clients">
                                <Route index element={<CustomersPage />} />
                                <Route path=":id" element={<EditClients />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ViewProvider >
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
}



