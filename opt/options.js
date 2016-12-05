// Saves options to chrome.storage
function save_options() {
	var categoryBuildings  = document.getElementById('categoryBuildings').value;
	var categoryFood       = document.getElementById('categoryFood').value;
	var categoryNature     = document.getElementById('categoryNature').value;
	var categoryPeople     = document.getElementById('categoryPeople').value;
	var categoryTechnology = document.getElementById('categoryTechnology').value;
	var categoryObjects    = document.getElementById('categoryObjects').value;
	var backgroundRefresh  = document.getElementById('refresh').value;
	var lastFMusername     = document.getElementById('lastFMusername').value;
	chrome.storage.sync.set({
		categoryBuildings:  categoryBuildings,
		categoryFood:       categoryFood,
		categoryNature:     categoryNature,
		categoryPeople:     categoryPeople,
		categoryTechnology: categoryTechnology,
		categoryObjects:    categoryObjects,
		backgroundRefresh:  backgroundRefresh,
		lastFMusername:     lastFMusername
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved!';
		setTimeout(function() {
			status.textContent = '';
		}, 1500);
	});
}

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get({
		categoryBuildings:  'category/buildings',
		categoryFood:       'category/food',
		categoryNature:     'category/nature',
		categoryPeople:     'category/people',
		categoryTechnology: 'category/technology',
		categoryObjects:    'category/objects',
		backgroundRefresh:  'daily',
		lastFMusername:     'paul_r_schaefer'
	}, function(items) {
		document.getElementById('categoryBuildings').value  = items.categoryBuildings;
		document.getElementById('categoryFood').value       = items.categoryFood;
		document.getElementById('categoryNature').value     = items.categoryNature;
		document.getElementById('categoryPeople').value     = items.categoryPeople;
		document.getElementById('categoryTechnology').value = items.categoryTechnology;
		document.getElementById('categoryObjects').value    = items.categoryObjects;
		document.getElementById('refresh').value            = items.backgroundRefresh;
		document.getElementById('lastFMusername').value     = items.lastFMusername;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
