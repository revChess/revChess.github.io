'use strict';

(async ()=>{
    // thanks a lot Chromium
    console.log(`Has persistent storage: ${await navigator.storage.persisted()}`);
    if (!(await navigator.storage.persisted())) {
        promptUser(
            `Would you like to persist storage? It is currently not persisted. <b>Not persisting storage may result in an irrevocable loss of data.</b> Browsers may periodically clean up data that remains unused when there is low space on your computer, but there's some magic code that can request for it to persist and not get affected by this.<br><br>revChess does not store any user's chess games, Revs, or otherwise on a server. It is only stored locally.<br><br>On Chromium-based browsers, there is no prompt to accept this. Upon pressing 'okay' at the bottom of this alert, an attempt will be made to request persistent storage. If it fails, you will be alerted.<br><br><b>revChess is completely open sourced, and you can view all the code at github.com/revChess.</b>`,
            ['Okay'],
            async ()=>{
                if (!await navigator.storage.persist()) {
                    promptUser(
                        `The attempt to persist storage has failed. <b>revChess will NEVER send you any notifications.</b> On some browsers, having notifications permission is enough to allow persisting storage to go through. You are free to research this topic for yourself.<br><br>You can also go to Manage Revs > Export > Export All to save everything as a backup.<br><br>You can continue with 'I understand', try again, or press 'notifications' to try to make persistent storage possible.`, 
                        ['I understand', 'Reload', 'Notifications'],
                        async response=>{
                            if (response === 'Reload') {
                                setTimeout(()=>{location.reload()}, 3000);
                            } else if (response === 'Notifications') {
                                await Notification.requestPermission();
                                setTimeout(()=>{location.reload()}, 3000);
                            }
                        }
                    );
                }
            }
        );
    }
})();