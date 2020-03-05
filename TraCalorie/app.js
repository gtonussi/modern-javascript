// Storage Controller
const StorageCtrl = (function(){
    //Public Methods
    return {
        storeItem: function(item){
            let items
            //Check To See If There is Any Item
            if(localStorage.getItem('items') === null){
                items = [];
                //Push New Item
                items.push(item);
                //Set ls
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem('items'));
                //Push New Item
                items.push(item);
                //Reset LS
                localStorage.setItem('items', JSON.stringify(items));
            }
        },

        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },

        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            })
            localStorage.setItem('items', JSON.stringify(items));
        },

        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            })
            localStorage.setItem('items', JSON.stringify(items));
        },

        clearItemsFromStorage: function(){
            localStorage.removeItem('items');
        }
    }
})();

// Item Controller
const ItemCtrl = (function() {
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure / State
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    // Public Methods
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calories) {
            // Create ID
            let ID;

            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories To Number
            calories = parseInt(calories);

            // Create New Item
            newItem = new Item(ID, name, calories);

            // Add To Items Array
            data.items.push(newItem);

            return newItem;
        },

        getItemById: function(id) {
            let found = null;
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },

        deleteItem: function(id){
            //Get IDs
            const ids = data.items.map(function(item){
                return item.id;
            });

            //Get Index
            const index = ids.indexOf(id);

            //Remove Item
            data.items.splice(index, 1);
        },

        clearAllItems: function(){
            data.items = [];
        },

        updateItem: function(name, calories){
            //Calories To Number
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },

        setCurrentItem: function(item) {
            data.currentItem = item;
        },

        getCurrentItem: function(){
            return data.currentItem;
        },

        getTotalCalories: function() {
            let total = 0;

            data.items.forEach(function(item){
                total += item.calories;
            })

            data.totalCalories = total;

            return data.totalCalories;

        },

        logData: function() {
            return data;
        }
    }
})();

// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }
    
    // Public Methods
    return {

        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                </li>
                `;
            });

            //Insert List Items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: function(item) {
            //Show The List
            document.querySelector(UISelectors.itemList).style.display = 'block'
            //Create <li> Element
            const li = document.createElement('li');
            //Add Class
            li.className = 'collection-item';
            //Add ID
            li.id = `item-${item.id}`;
            //Add HTML
            li.innerHTML = `
            <strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `
            //Insert Item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //Turn Node List Into Array
            listItems = Array.from(listItems);
            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');
                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    `
                }
            })
        },

        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },

        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },

        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems);
            listItems.forEach(function(item){
                item.remove();
            });
        },

        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        getSelectors: function() {
            return UISelectors;
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {

    //Load Event Listeners
    const loadEventListeners = function() {
        //Load Event Listeners
        const UISelectors = UICtrl.getSelectors();

        //Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Disable Submit On Enter
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        })

        //Edit Icon Click Event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        //Update Item Event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        //Delete Item Event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        //ClearAll Item Event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

        //Back Button When Editing
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    }

    // Add Item Submit
    const itemAddSubmit = function(e){
        
        // Get Form Input From UI Controller
        const input = UICtrl.getItemInput();

        // Check For Name And Calorie Input
        if(input.name !== '' && input.calories !== ''){
            // Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add Item to UI List
            UICtrl.addListItem(newItem);
            //Get Total Calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add Total Calories to UI
            UICtrl.showTotalCalories(totalCalories);
            //Storage In LocalStorage
            StorageCtrl.storeItem(newItem);
            // Clear Fields
            UICtrl.clearInput();
        }
        
        e.preventDefault();

    }

    //Click Edit Item
    const itemEditClick = function(e) {
        if(e.target.classList.contains('edit-item')){
            //Get List Item ID
            const listId = e.target.parentNode.parentNode.id;
            //Break Into An Array
            const listIdArr = listId.split('-');
            //Get The Actual ID
            const id = parseInt(listIdArr[1]);
            //Get Item
            const itemToEdit = ItemCtrl.getItemById(id);
            //Set Current Item
            ItemCtrl.setCurrentItem(itemToEdit);
            //Add Item To Form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    //Update Item Submit
    const itemUpdateSubmit = function(e) {
        //Get Item Input
        const input = UICtrl.getItemInput();

        //Update Item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        //Update UI
        UICtrl.updateListItem(updatedItem);

        //Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add Total Calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //Update LocalStorage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();
        
        e.preventDefault();
    }

    //Delete Button Event
    const itemDeleteSubmit = function(e) {
        //Get Current Item
        const currentItem = ItemCtrl.getCurrentItem();
        //Delete From Data Structure
        ItemCtrl.deleteItem(currentItem.id);
        //Delete From UI
        UICtrl.deleteListItem(currentItem.id);
        //Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add Total Calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //Delete Item From Local Storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    const clearAllItemsClick = function(){
        //Delete All Items From Sctructure
        ItemCtrl.clearAllItems();
        //Delte From UI
        UICtrl.removeItems();
        //Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //Add Total Calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //Clear From Local Storage
        StorageCtrl.clearItemsFromStorage();

        //Hide UL
        UICtrl.hideList();
    }
    
    // Public Methods
    return {
        init: function(){
            // Clear Edit State
            UICtrl.clearEditState();

            // Fetch Items From Data Structure
            const items = ItemCtrl.getItems();

            //Check If Any Items
            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate List With Items
                UICtrl.populateItemList(items);
            }

            //Get Total Calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add Total Calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Load Event Listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();