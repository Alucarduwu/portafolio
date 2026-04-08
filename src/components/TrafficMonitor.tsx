import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const TrafficMonitor: React.FC = () => {
    const [ip, setIp] = useState<string>("CONNECTING...");
    const [hits, setHits] = useState<number | null>(null);
    const [recentLogs, setRecentLogs] = useState<string[]>([]);

    useEffect(() => {
        // Fetch Client IP
        axios.get("https://api.ipify.org?format=json")
            .then(res => setIp(res.data.ip))
            .catch(() => setIp("TRACE_FAILED"));

        // Fetch & Increment Hit Count (Using counterapi.dev)
        // Note: Using a unique namespace for this portfolio
        axios.get("https://api.counterapi.dev/v1/anahi-portfolio-v6/hits/up")
            .then(res => setHits(res.data.count))
            .catch(() => setHits(null));

        // Simulated Access Logs
        const logTemplates = [
            "NODE_AUTH_SUCCESS",
            "HANDSHAKE_COMPLETE",
            "ENCRYPT_LAYER_ACTIVE",
            "GEO_LOC_MAPPED",
            "SESSION_TOKEN_SYNC"
        ];

        const interval = setInterval(() => {
            const newLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
            setRecentLogs(prev => [newLog, ...prev].slice(0, 3));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-2 font-mono text-[7px] uppercase tracking-widest text-[var(--text-muted)] lg:block hidden">
            <div className="flex flex-col gap-1 border-l border-[var(--primary)]/30 pl-3">
                <div className="flex items-center gap-2">
                    <span className="text-[var(--primary)] font-black">ACCESS_POINT:</span>
                    <span>{ip}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[var(--primary)] font-black">TOTAL_VISITS:</span>
                    <span className="text-[var(--text-main)] transition-all font-bold">
                        {hits !== null ? hits.toLocaleString().padStart(6, '0') : "FETCHING..."}
                    </span>
                </div>
            </div>

            <div className="mt-2 space-y-0.5 opacity-40 overflow-hidden h-[24px]">
                <AnimatePresence mode="popLayout">
                    {recentLogs.map((log, i) => (
                        <motion.div
                            key={`${log}-${i}`}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 10, opacity: 0 }}
                            className="flex items-center gap-2"
                        >
                            <span className="text-[var(--primary)]">›</span>
                            <span>{log}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TrafficMonitor;
