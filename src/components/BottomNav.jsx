import React from "react";
import Nav from "./Nav";

export default function BottomNav() {

    return (
        <div className="max-w-sm block md:hidden bg-card rounded-xl px-2 py-1 border-border border-3 fixed left-[50%] -bottom-4 -translate-1/2 z-101">
            <Nav />
        </div>
    )
}