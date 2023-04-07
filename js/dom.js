'use strict';

(()=>{
    let activeTab = 'review';

    function createEventListenerFor(name) {
        $(`#btn-${name}`).addEventListener('click', () => {
            $.hideElement($(`#aside-${activeTab}`));
            $.showElement($(`#aside-${name}`));

            activeTab = name;
        });
    }

    createEventListenerFor('review');
    createEventListenerFor('learn');
    createEventListenerFor('manage');
    createEventListenerFor('settings');
})();