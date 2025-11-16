import { X, AlertCircle } from 'lucide-react';

function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 m-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-red-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
