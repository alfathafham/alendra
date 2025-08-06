document.addEventListener('DOMContentLoaded', function() {
  // Data layanan
  const services = [
    {
      title: "Sewa Perangkat IT",
      description: "Layanan penyewaan perangkat IT lengkap untuk berbagai kebutuhan perusahaan",
      icon: "laptop-house",
      link: "../pages/services/sewa-perangkat.html",
      tags: ["hardware", "support"]
    },
    {
      title: "Pemeliharaan & Service",
      description: "Perawatan dan perbaikan perangkat IT oleh teknisi berpengalaman",
      icon: "tools",
      link: "../pages/services/pemeliharaan-service.html",
      tags: ["hardware", "support"]
    },
    {
      title: "Pemasangan Jaringan",
      description: "Instalasi jaringan kabel dan nirkabel untuk berbagai skala bisnis",
      icon: "network-wired",
      link: "../pages/services/pemasangan-jaringan.html",
      tags: ["network", "hardware"]
    },
    // Tambahkan layanan lainnya sesuai kebutuhan
  ];

  const servicesGrid = document.querySelector('.services-grid');
  const searchInput = document.querySelector('.search-input');
  const categoryFilter = document.querySelector('.category-filter');

  // Render layanan
  function renderServices(filteredServices = services) {
    servicesGrid.innerHTML = '';
    
    filteredServices.forEach(service => {
      const serviceCard = document.createElement('div');
      serviceCard.className = 'service-card';
      serviceCard.dataset.tags = service.tags.join(' ');
      
      serviceCard.innerHTML = `
        <a href="${service.link}">
          <div class="service-icon">
            <i class="fas fa-${service.icon}"></i>
          </div>
          <div class="service-content">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="service-tags">
              ${service.tags.map(tag => `<span class="service-tag">${tag}</span>`).join('')}
            </div>
          </div>
        </a>
      `;
      
      servicesGrid.appendChild(serviceCard);
    });
  }

  // Filter layanan
  function filterServices() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    const filtered = services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm) || 
                          service.description.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || 
                            service.tags.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
    
    renderServices(filtered);
  }

  // Event listeners
  searchInput.addEventListener('input', filterServices);
  categoryFilter.addEventListener('change', filterServices);

  // Render awal
  renderServices();
});