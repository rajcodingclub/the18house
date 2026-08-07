import useScrollAnimations from '../hooks/useScrollAnimations.js';

function DishCard({ dish, index }) {
  return (
    <div className="dish-card animate-from-left" style={{ '--delay': `${(index * 0.08).toFixed(2)}s` }}>
      <h3 className="dish-title">{dish.title}</h3>
      <p className="dish-desc">{dish.description}</p>
      <a href={dish.orderUrl || '#order'} className="dish-order-btn">ORDER NOW</a>
    </div>
  );
}

export default function CategorySection({ category, dishes }) {
  const isImageLeft = category.imagePosition === 'left';

  const media = (
    <div className={`featured-media-wrap ${isImageLeft ? 'animate-from-left' : 'animate-from-right'}`}>
      <img src={category.featuredImage} alt={`Featured ${category.name}`} />
    </div>
  );

  const dishesBlock = (
    <div className={`dishes-list-wrap ${isImageLeft ? 'animate-from-right' : 'animate-from-left'}`}>
      <div className="dishes-grid">
        {dishes.map((dish, idx) => (
          <DishCard dish={dish} index={idx} key={dish._id || `${category.id}-${idx}`} />
        ))}
      </div>

      <div className="menu-delivery-row">
        <a href="#" className="menu-delivery-btn zomato">ORDER ON ZOMATO</a>
        <a href="#" className="menu-delivery-btn swiggy">ORDER ON SWIGGY</a>
      </div>
    </div>
  );

  return (
    <div className="category-section-block" id={`cat-${category.id}`}>
      <div className="category-header-wrap animate-from-top">
        <div className="category-title-box">
          <h2 className="category-title">{category.name}</h2>
          <svg className="category-spark" width="42" height="32" viewBox="0 0 32 24" fill="none">
            <path d="M4 22L10 12M14 18L16 4M24 20L20 8" stroke="#f4e02c" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="category-description">{category.description}</p>
      </div>

      <div className={`menu-content-grid ${isImageLeft ? 'image-left' : 'image-right'}`}>
        {isImageLeft ? (
          <>
            {media}
            {dishesBlock}
          </>
        ) : (
          <>
            {dishesBlock}
            {media}
          </>
        )}
      </div>
    </div>
  );
}
