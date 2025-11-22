interface StoryCardProps {
  quote: string;
  name: string;
  age: number;
  category: string;
  backgroundColor?: string;
}

export default function StoryCard({
  quote,
  name,
  age,
  category,
  backgroundColor = "bg-orange-50",
}: StoryCardProps) {
  return (
    <div className={`${backgroundColor} rounded-3xl p-8 lg:p-12 shadow-sm`}>
      {/* Quote Icon */}
      <div className="mb-6">
        <svg
          className="w-16 h-16 text-orange-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
      </div>

      {/* Quote Text */}
      <p className="text-gray-700 text-lg lg:text-xl mb-8 leading-relaxed italic">
        "{quote}"
      </p>

      {/* Name and Details */}
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {name}, Age {age}
          </h3>
          <p className="text-gray-600">{category}</p>
        </div>

        {/* Success Story Badge */}
        <div className="text-orange-500 font-semibold text-sm">
          Success Story
        </div>
      </div>
    </div>
  );
}
