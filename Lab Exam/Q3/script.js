$(document).ready(function() {
    // Array to store heroes
    let heroes = [
      // Example hero data structure
      {name: "Alex", parent: "Athena", avatar: "avatar1.jpg", abilities: "Wisdom and Strategy", weapon: "Spear", tale: "Defeated a Cyclops single-handedly"}
    ];
  
    // Display Hero Cards
    function renderHeroes() {
      $(".hero-grid").html("");
      heroes.forEach((hero, index) => {
        $(".hero-grid").append(`
          <div class="hero-card p-4 bg-gray-100 rounded-lg relative">
            <img src="${hero.avatar}" alt="${hero.name}" class="w-16 h-16 rounded-full">
            <h3>${hero.name}</h3>
            <p>${hero.parent}</p>
            <button class="delete-hero absolute top-2 right-2" data-index="${index}">&times;</button>
          </div>
        `);
      });
    }
  
    // Open Hero Detail Modal
    $(document).on("click", ".hero-card", function() {
      const index = $(this).data("index");
      const hero = heroes[index];
      $("#heroModal").fadeIn().find(".modal-content").html(`
        <h3>${hero.name}</h3>
        <p>Parent: ${hero.parent}</p>
        <p>Abilities: ${hero.abilities}</p>
        <p>Weapon: ${hero.weapon}</p>
        <p>Tale: ${hero.tale}</p>
        <button id="editHero" data-index="${index}">Edit</button>
      `);
    });
  
    // Close Modal
    $(".close-modal").on("click", function() {
      $("#heroModal").fadeOut();
    });
  
    // Delete Hero
    $(document).on("click", ".delete-hero", function(event) {
      event.stopPropagation();
      const index = $(this).data("index");
      if (confirm("Are you sure you want to delete this hero?")) {
        heroes.splice(index, 1);
        renderHeroes();
      }
    });
  
    // Initialize rendering
    renderHeroes();
  });
  