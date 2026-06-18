import {useEffect, useState} from "react";

function useFetch<T extends Object> (url:string, options:any = {}) {
    const [data, setData] = useState(null as T | null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }

                const result = await res.json();
                setData(result as T);
            } catch (err:any) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup: cancel the request if component unmounts
        return () => controller.abort();
    }, [url]);

    return [ data, loading, error ] as const;
};

export default useFetch;