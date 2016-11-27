// Saves options to chrome.storage
function save_options() {
	var backgroundCategory = document.getElementById('category').value;
	var backgroundRefresh  = document.getElementById('refresh').value;
	var lastFMusername     = document.getElementById('lastFMusername').value;
	chrome.storage.sync.set({
		backgroundCategory: backgroundCategory,
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
		backgroundCategory: 'category/nature',
		backgroundRefresh:  'daily',
		lastFMusername:     'paul_r_schaefer'
	}, function(items) {
		document.getElementById('category').value       = items.backgroundCategory;
		document.getElementById('refresh').value        = items.backgroundRefresh;
		document.getElementById('lastFMusername').value = items.lastFMusername;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
