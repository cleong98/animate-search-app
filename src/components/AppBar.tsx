import { useNavigate } from "react-router";
import { IoArrowBack } from "react-icons/io5";

interface AppBarProps {
  title?: string;
  showBackButton?: boolean;
}

function AppBar({ title, showBackButton = false }: AppBarProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-base-100 border-b border-base-300">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-base-200 transition-colors"
              aria-label="Go back"
            >
              <IoArrowBack className="h-6 w-6" />
            </button>
          )}

          {title && <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>}
        </div>
      </div>
    </header>
  );
}

export default AppBar;
