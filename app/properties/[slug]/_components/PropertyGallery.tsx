"use client";

import { useState } from "react";
import Image from "next/image";
import { Grid2X2 } from "lucide-react";

interface Props {
	initialImage: string;
	imageAlt: string;
	galleryUrls: string[];
	featuredBadge?: string | null;
	status: string;
}

export const PropertyGallery = ({
	initialImage,
	imageAlt,
	galleryUrls,
	featuredBadge,
	status,
}: Props) => {
	const [activeImage, setActiveImage] = useState(initialImage);

	return (
		<div className="space-y-4">
			{/* Main Large Image */}
			<div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group bg-gray-100 dark:bg-white/5">
				<Image
					key={activeImage} // force re-render for nice simple transition or just let next/image handle it
					src={activeImage}
					alt={imageAlt}
					fill
					priority
					className="object-cover transition-transform duration-700 group-hover:scale-105 animate-in fade-in duration-500"
				/>

				<div className="absolute top-4 left-4 flex gap-2 z-10">
					{featuredBadge && (
						<span className="bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
							{featuredBadge}
						</span>
					)}
					<span className="bg-white/90 dark:bg-black/80 text-nordic-dark dark:text-white backdrop-blur text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
						{status}
					</span>
				</div>

				<button className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-nordic-dark dark:text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2 z-10">
					<Grid2X2 className="w-4 h-4" strokeWidth={2} />
					View All Photos
				</button>
			</div>

			{/* Thumbnails Gallery */}
			<div className="flex gap-3 overflow-x-auto hide-scroll py-4 snap-x">
				{galleryUrls.map((url, i) => {
					const isActive = activeImage === url;
					return (
						<div
							key={i}
							onClick={() => setActiveImage(url)}
							className={`flex-none w-48 aspect-[4/3] rounded-xl cursor-pointer snap-start transition-all duration-300 ${
								isActive
									? "p-1 border-2 border-mosque dark:border-primary scale-100 opacity-100"
									: "p-0 border-2 border-transparent opacity-60 hover:opacity-100 scale-95"
							}`}
						>
							{/* Inner wrapper for image to ensure offset gap creates correctly without outward box-shadows */}
							<div className="w-full h-full relative rounded-lg overflow-hidden shadow-sm">
								<Image
									src={url}
									alt={`Gallery image ${i + 1}`}
									fill
									className="object-cover"
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
