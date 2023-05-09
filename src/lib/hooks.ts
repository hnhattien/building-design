import { useEffect, useState } from 'react';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState<{
        width: number;
        height: number;
    }>({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth || 0,
                height: window.innerHeight || 0,
            });
        }
        // Add event listener
        window.addEventListener('resize', handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export { useWindowSize };
