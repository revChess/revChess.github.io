'use strict';

// there's too many sites out there that generate multiple darkened overlays
// for multiple popups because of lazy coding
// don't be like them
let popupCount = 0;

function promptUser(message='Generic message', choices=['OK'], handler=()=>{}) {
    // popup boxes
    // the handler is given one parameter, being the choice that is clicked

    /*
     * The general structure should look like this:
     * 
     * <div id="transparent-overlay">
     *   <div class="popup-box center">
     *     this is a message
     *     <div class="popup-box-options">
     *       <button button-text="OK">OK</button>
     *     </div>
     *   </div>
     * </div>
     * 
     */

    const popupBox = $.createElement(
        'div',
        {
            class: 'popup-box center'
        }
    );
    popupBox.innerHTML = message;

    // these are the actual options, like yes, no, etc.
    const popupBoxOptions = $.createElement(
        'div',
        {
            class: 'popup-box-options'
        }
    );

    function createOption(name) {
        const optionBtn = $.createElement(
            'button',
            {
                // the button-text attribute allows for special styling
                // for example, all buttons with "Yes" could have a special
                // style thanks to CSS selectors
                ['button-text']: name
            },
            name
        );

        optionBtn.addEventListener('click', ()=>{
            // hide the popup
            popupBox.remove();
            popupCount--;

            // hides the dark overlay only if all popups have been closed
            if (popupCount === 0) {
                $.hideElement(POPUP_OVERLAY);
            }

            // call the handler
            handler(name);
        });

        return optionBtn;
    }

    choices.forEach(i => {
        popupBoxOptions.appendChild(
            createOption(i)
        );
    });
    
    popupBox.appendChild(popupBoxOptions);
    POPUP_OVERLAY.appendChild(popupBox);
    
    $.showElement(POPUP_OVERLAY);

    popupCount++;
}

(()=>{
    // switches tabs for the main nav bar (review/learn/manage/settings)

    // it starts at the review tab
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