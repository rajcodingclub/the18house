import { useEffect, useMemo, useState } from 'react';
import MenuNav from '../components/MenuNav.jsx';
import MenuPageHero from '../components/MenuPageHero.jsx';
import MenuFilterBar from '../components/MenuFilterBar.jsx';
import CategorySection from '../components/CategorySection.jsx';
import PromoBanner from '../components/PromoBanner.jsx';
import Testimonials from '../components/Testimonials.jsx';
import BookingSection from '../components/BookingSection.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import Footer from '../components/Footer.jsx';
import useScrollAnimations from '../hooks/useScrollAnimations.js';
import { api } from '../api/client.js';

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load menu categories + dishes from the API (replaces the old data.js include)
  useEffect(() => {
    let cancelled = false;

    api
      .getMenu()
      .then((res) => {
        if (!cancelled) setCategories(res.categories || []);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || 'Failed to load the menu.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Smooth-scroll to the selected category, same as the original handleFilter()
  useEffect(() => {
    if (selectedCategory === 'all') return;
    const target = document.getElementById(`cat-${selectedCategory}`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selectedCategory]);

  const normalizedQuery = searchQuery.toLowerCase().trim();

  // Mirrors renderAllSections(): filter by category, then filter dishes by search query,
  // and drop categories left with zero matches while searching.
  const visibleSections = useMemo(() => {
    const base =
      selectedCategory === 'all' ? categories : categories.filter((c) => c.id === selectedCategory);

    return base
      .map((cat) => {
        const dishes = (cat.dishes || []).filter(
          (d) =>
            d.title.toLowerCase().includes(normalizedQuery) ||
            d.description.toLowerCase().includes(normalizedQuery)
        );
        return { category: cat, dishes };
      })
      .filter((section) => normalizedQuery === '' || section.dishes.length > 0);
  }, [categories, selectedCategory, normalizedQuery]);

  // Re-run entrance animations whenever the rendered sections change
  useScrollAnimations([visibleSections]);

  return (
    <>
      <MenuNav />
      <MenuPageHero />

      <section className="menu-filter-section" id="interactive-menu">
        <MenuFilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div id="allMenuSections" className="menu-display-container">
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#0b2b1b' }}>Loading menu…</h3>
            </div>
          )}

          {!loading && loadError && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#0b2b1b' }}>{loadError}</h3>
            </div>
          )}

          {!loading && !loadError && visibleSections.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#0b2b1b' }}>
                No menu items match your search &quot;{searchQuery}&quot;.
              </h3>
            </div>
          )}

          {!loading &&
            !loadError &&
            visibleSections.map(({ category, dishes }) => (
              <CategorySection category={category} dishes={dishes} key={category.id} />
            ))}
        </div>
      </section>

      <PromoBanner />
      <Testimonials style={{ marginTop: '100px' }} />
      <BookingSection />
      <WhatsAppFloat />
      <Footer />
    </>
  );
}
