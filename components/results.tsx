/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

type Props = {
    results: Product[];
};

export const Results = ({ results }: Props) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-5 w-full  ">
            {results.map((item) => (
                <Link
                    target="_blank"
                    key={item.title}
                    href={item.url}
                    className="flex flex-col space-x-4 w-full bg-white rounded-lg shadow-md p-5"
                >
                    <img srcSet={item.imageset} alt={item.title} className="object-contain w-full h-40 py-5" />

                    <div className="flex flex-col flex-1 py-5">
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-gray-500">
                            {item.rating} ({item.reviews} reviews)
                        </p>
                    </div>

                    <div className="flex justify-end flex-1 gap-2">
                        <p className="font-bold text-indigo-500 pt-2 text-xl mt-auto">
                            {item.price > 0 ? `$${item.price}` : "N/A"}
                        </p>

                        {item.previous_price > 0 && (
                            <p className="font-bold text-indigo-500/50 line-through pt-2 text-xl mt-auto">
                                ${item.previous_price}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end mt-5">
                        {item.features.map(
                            (feature) =>
                                feature && (
                                    <p key={feature} className="text-xs bg-indigo-500 px-2 py-1 text-white rounded-md">
                                        {feature}
                                    </p>
                                ),
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
};
