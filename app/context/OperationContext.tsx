import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type OperationType = 'login' | 'signup' | 'update' | 'processing';
type AlertType = 'success' | 'error' | 'warning' | 'info';

interface OperationState {
    operationType: OperationType;
    isVisible: boolean;
    progress: number;
    dots: string;
    message?: string;
}

interface AlertState {
    isVisible: boolean;
    type: AlertType;
    title: string;
    message: string;
    duration?: number; // Auto-hide after duration (ms), 0 = no auto-hide
}

interface OperationContextType {
    operationState: OperationState;
    alertState: AlertState;
    showOperation: (type: OperationType, customMessage?: string) => void;
    hideOperation: () => void;
    completeOperation: () => void;
    updateProgress: (progress: number) => void;
    showAlert: (type: AlertType, title: string, message: string, duration?: number) => void;
    hideAlert: () => void;
    showSuccess: (title: string, message: string, duration?: number) => void;
    showError: (title: string, message: string, duration?: number) => void;
    showWarning: (title: string, message: string, duration?: number) => void;
    showInfo: (title: string, message: string, duration?: number) => void;
}

const OperationContext = createContext<OperationContextType | undefined>(undefined);

interface OperationProviderProps {
    children: ReactNode;
    defaultDuration?: number;
    defaultAlertDuration?: number;
}

export const OperationProvider: React.FC<OperationProviderProps> = ({
    children,
    defaultDuration = 5000,
    defaultAlertDuration = 5000
}) => {
    const [operationState, setOperationState] = useState<OperationState>({
        operationType: 'processing',
        isVisible: false,
        progress: 0,
        dots: '',
        message: undefined
    });

    const [alertState, setAlertState] = useState<AlertState>({
        isVisible: false,
        type: 'info',
        title: '',
        message: '',
        duration: defaultAlertDuration
    });

    const [duration, setDuration] = useState<number>(defaultDuration);

    useEffect(() => {
        if (!operationState.isVisible) {
            setOperationState(prev => ({ ...prev, progress: 0, dots: '' }));
            return;
        }

        const progressInterval = setInterval(() => {
            setOperationState(prev => {
                if (prev.progress >= 90) {
                    clearInterval(progressInterval);
                    return { ...prev, progress: 90 };
                }
                return { ...prev, progress: prev.progress + 1 };
            });
        }, duration / 100);

        const dotsInterval = setInterval(() => {
            setOperationState(prev => {
                const newDots = prev.dots.length >= 3 ? '' : prev.dots + '.';
                return { ...prev, dots: newDots };
            });
        }, 500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(dotsInterval);
        };
    }, [operationState.isVisible, duration]);

    // Auto-hide alert after duration
    useEffect(() => {
        if (alertState.isVisible && alertState.duration && alertState.duration > 0) {
            const timer = setTimeout(() => {
                hideAlert();
            }, alertState.duration);

            return () => clearTimeout(timer);
        }
    }, [alertState.isVisible, alertState.duration]);

    const showOperation = (type: OperationType, customMessage?: string) => {
        setOperationState({
            operationType: type,
            isVisible: true,
            progress: 0,
            dots: '',
            message: customMessage
        });
    };

    const hideOperation = () => {
        setOperationState(prev => ({ ...prev, isVisible: false }));
    };

    const completeOperation = () => {
        setOperationState(prev => ({ ...prev, progress: 100 }));
        setTimeout(() => {
            setOperationState(prev => ({ ...prev, isVisible: false }));
        }, 300);
    };

    const updateProgress = (progress: number) => {
        setOperationState(prev => ({ ...prev, progress }));
    };

    const showAlert = (type: AlertType, title: string, message: string, duration?: number) => {
        setAlertState({
            isVisible: true,
            type,
            title,
            message,
            duration: duration !== undefined ? duration : defaultAlertDuration
        });
    };

    const hideAlert = () => {
        setAlertState(prev => ({ ...prev, isVisible: false }));
    };

    // Convenience methods for different alert types
    const showSuccess = (title: string, message: string, duration?: number) => {
        showAlert('success', title, message, duration);
    };

    const showError = (title: string, message: string, duration?: number) => {
        showAlert('error', title, message, duration);
    };

    const showWarning = (title: string, message: string, duration?: number) => {
        showAlert('warning', title, message, duration);
    };

    const showInfo = (title: string, message: string, duration?: number) => {
        showAlert('info', title, message, duration);
    };

    const value: OperationContextType = {
        operationState,
        alertState,
        showOperation,
        hideOperation,
        completeOperation,
        updateProgress,
        showAlert,
        hideAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo
    };

    return (
        <OperationContext.Provider value={value}>
            {children}
            <OperationNotification />
            <AlertNotification />
        </OperationContext.Provider>
    );
};

// Hook to use the operation context
export const useOperation = (): OperationContextType => {
    const context = useContext(OperationContext);
    if (context === undefined) {
        throw new Error('useOperation must be used within an OperationProvider');
    }
    return context;
};

// The operation notification component
const OperationNotification: React.FC = () => {
    const { operationState, hideOperation } = useOperation();
    const { operationType, isVisible, progress, dots, message } = operationState;

    const getOperationTitle = (): string => {
        switch (operationType) {
            case 'login': return 'Logging in';
            case 'signup': return 'Creating account';
            case 'update': return 'Updating information';
            default: return 'Processing';
        }
    };

    const getOperationMessage = (): string => {
        if (message) return message;

        switch (operationType) {
            case 'login': return 'Please wait while we authenticate your account';
            case 'signup': return 'Setting up your new account, this will just take a moment';
            case 'update': return 'Applying your changes, please don\'t close this window';
            default: return 'Your request is being processed';
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[10000] bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl px-6 py-4 w-[300px] animate-fade-in">
                {/* Header with icon */}
                <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 animate-pulse">
                            <path d="M6 2h12v4l-4 4 4 4v4H6v-4l4-4-4-4V2z" fill="none" stroke="currentColor" strokeWidth="1.5" />

                            <path d="M8 4h8l-4 4-4-4z" fill="currentColor" opacity="0.7" />

                            <path d="M12 8v8" stroke="currentColor" strokeWidth="1" opacity="0.8" />

                            <path d="M8 20h8l-4-4-4 4z" fill="currentColor" opacity="0.3" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{getOperationTitle()}{dots}</h3>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Message */}
                <p className="text-gray-600 text-sm mb-4">{getOperationMessage()}</p>

                {/* Animated loader */}
                {/*  <div className="flex justify-center">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div> */}

                {/* Cancel button */}
                {/* <button
                    onClick={hideOperation}
                    className="mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    Cancel
                </button> */}
            </div>
        </div>
    );
};

// The alert notification component
const AlertNotification: React.FC = () => {
    const { alertState, hideAlert } = useOperation();
    const { isVisible, type, title, message } = alertState;

    const getAlertStyles = () => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-800',
                    icon: (
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    )
                };
            case 'error':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-800',
                    icon: (
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    )
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-800',
                    icon: (
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    )
                };
            case 'info':
            default:
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-800',
                    icon: (
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    )
                };
        }
    };

    const styles = getAlertStyles();

    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 z-[30000] max-w-sm w-full">
            <div className={`rounded-md shadow-lg border ${styles.bg} ${styles.border} animate-slide-in`}>
                <div className={`mx-3 mt-2.5`}>
                    <div className={`flex place-items-center place-content-between gap-2`}>
                        <div className={`w-fit`}>
                            {styles.icon}
                        </div>
                        <div className={`text-md font-bold ${styles.text} grow w-full text-start`}>
                            {title}
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                onClick={hideAlert}
                                className={`inline-flex ${styles.bg} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`mx-6 mt-1 mb-5`}>
                    <p className={`mt-1 text-sm ${styles.text}`}>
                        {message}
                    </p>
                </div>

                {/* <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {styles.icon}
                    </div>
                    <div className="ml-3 w-0 flex-1">
                        <h3 className={`text-sm font-bold ${styles.text}`}>
                            {title}
                        </h3>

                        <p className={`mt-1 text-sm ${styles.text}`}>
                            {message}
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            onClick={hideAlert}
                            className={`inline-flex ${styles.bg} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

// Demo component showing how to use the enhanced context
export const OperationDemo: React.FC = () => {
    const { showOperation, showSuccess, showError, showWarning, showInfo } = useOperation();

    const simulateLogin = () => {
        showOperation('login');

        // Simulate API call
        setTimeout(() => {
            showSuccess('Login Successful', 'You have been successfully logged in to your account.');
        }, 3000);
    };

    const simulateSignup = () => {
        showOperation('signup', 'Creating your profile and preferences...');

        // Simulate failed signup
        setTimeout(() => {
            showError('Signup Failed', 'The email address is already registered. Please try a different email.');
        }, 3000);
    };

    const simulateUpdate = () => {
        showOperation('update');

        // Simulate update with warning
        setTimeout(() => {
            showWarning('Update Completed', 'Some features may not work correctly until you refresh the page.', 8000);
        }, 3000);
    };

    const showInformation = () => {
        showInfo('New Feature Available', 'Check out our new dashboard layout with improved analytics!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Enhanced Operation Context</h1>
            <p className="text-gray-600 mb-8">Now with result alerts and close buttons</p>

            <div className="flex flex-wrap gap-4 justify-center">
                <button
                    onClick={simulateLogin}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Simulate Login (Success)
                </button>

                <button
                    onClick={simulateSignup}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Simulate Signup (Error)
                </button>

                <button
                    onClick={simulateUpdate}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Simulate Update (Warning)
                </button>

                <button
                    onClick={showInformation}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                    Show Info Alert
                </button>
            </div>
        </div>
    );
};

// Usage in your App component
export const AppWithOperation: React.FC = () => {
    return (
        <OperationProvider defaultDuration={4000} defaultAlertDuration={6000}>
            <OperationDemo />
            {/* The rest of your app components */}
        </OperationProvider>
    );
};

export default OperationDemo;