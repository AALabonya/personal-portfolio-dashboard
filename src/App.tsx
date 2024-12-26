import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";

function App() {
  return (
    <ProtectedRoute>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <MainLayout></MainLayout>
      </ThemeProvider>
    </ProtectedRoute>
  );
}

export default App;
