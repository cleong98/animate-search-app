interface CardImageProps {
  imageUrl: string;
  webpUrl: string;
  title: string;
}

export function CardImage({ imageUrl, webpUrl, title }: CardImageProps) {
  return (
    <picture>
      <source srcSet={webpUrl} type="image/webp" />
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </picture>
  );
}
