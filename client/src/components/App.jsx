import ClientsPage from '../pages/ClientsPage';
import { Route, Routes } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import AppLayOut from './AppLayOut';
import AboutPage from '../pages/AboutPage';
import UsersPage from '../pages/UsersPage'
import EditUsers from '../components/EditUsers';
import EditClients from '../components/EditClients';

import { ViewProvider } from '../contexts/ViewContext';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
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
                            <Route path="about" element={<AboutPage />} />

                            <Route path='users' element={<ProtectedRoute roles={['admin']} />}>
                                <Route index element={<UsersPage />} />
                                <Route path="register" element={<Register />} />
                                <Route path=":id" element={<EditUsers />} />
                            </Route>

                            <Route path="clients">
                                <Route index element={<ClientsPage />} />
                                <Route path=":id" element={<EditClients />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ViewProvider >
        <Toaster position='top-center' />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
}



