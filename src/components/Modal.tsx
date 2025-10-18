import React from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
  fullScreen?: boolean;
}


const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  headerActions,
  fullScreen = false,
}) => {
  if (!isOpen) return null;

  const modalClasses = fullScreen
    ? `fixed top-0 right-0 sm:absolute sm:top-full sm:right-0 sm:mt-2 bg-white border rounded-xl shadow-lg p-6 w-full sm:w-[400px] h-full sm:h-auto sm:max-h-[600px] overflow-y-auto z-50 ${className}`
    : `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto z-50 ${className}`;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      <div className={modalClasses}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            {headerActions}
            <button onClick={onClose} aria-label="Close modal">
              <FiX className="text-xl cursor-pointer" />
            </button>
          </div>
        </div>
        
        {children}
      </div>
    </>
  );
};

export default Modal;
