// OnlineStatusContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

const OnlineStatusContext = createContext<boolean | null>(null);

export function useOnlineStatusContext() {
    const context = useContext(OnlineStatusContext);

    if (context === null) {
        return null
        //throw new Error("useOnlineStatusContext must be used within an OnlineStatusProvider");
    } else {
        return context
    }

}

export const OnlineStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        const updateStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);

        return () => {
            window.removeEventListener("online", updateStatus);
            window.removeEventListener("offline", updateStatus);
        };
    }, []);

    return (
        <OnlineStatusContext.Provider value={isOnline}>
            {children}

            {/* Automatically show offline banner */}
            {!isOnline && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "blue",
                        color: "#fff",
                        padding: "10px",
                        textAlign: "center",
                        fontWeight: "normal",
                        zIndex: 1000,
                        letterSpacing: "0px",


                    }}
                >
                    ⚠️ System is offline. Check internet connection.
                </div>
            )}
        </OnlineStatusContext.Provider>
    );
};
