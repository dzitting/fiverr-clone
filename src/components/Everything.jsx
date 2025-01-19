import Image from "next/image";
import React from "react";
import { BsCheckCircle } from 'react-icons';

function Everything() {
    const everythingData = [
        {
            title: "Stick to your budget",
            subtitle: "Find the right service for every price range. No hourly rates, just project-based pricing."
        },
        {
            title: "Quality work done quickly",
            subtitle: "Find the right freelancer to begin working on your project within minutes."
        },
        {
            title: "Protected payments, every time",
            subtitle: "Always know what you'll pay upfront. Your payment isn't released until you approve the work."
        },
        {
            title: "Count on 24/7 support",
            subtitle: "Our round-the-clock support team is available to help anytime, anywhere."
        }
    ];

    return (
        <div className="bg-[f1fdf7] flex py-20 justify-between px-24">
            <div >
                <h2 className="text-4xl mb-5 text-[#404145] font-bold">
                    The best part? Everything.
                </h2>
                <ul className="flex flex-col gap-10">
                    {everythingData.map(({title, subtitle})) => {
                        return (
                            <li key={title}>
                                <div>
                                    <BsCheckCircle className="text-[#62646a]"/>
                                    <h4>{title}</h4>
                                </div>
                                <p className="text-[#62646a]">{subtitle}</p>
                            </li>
                        );
                    })}
                    </ul>
            </div>
            <div>
                <Image src="/everything.webp" fill alt="everything"/>
            </div>
        </div>
        );
}

export default Everything;