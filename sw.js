self.addEventListener("install", () => {
  self.skipWaiting();
});


self.addEventListener("activate", () => {
  self.clients.claim();
});


/* =========================
   PUSH NOTIFICATION
========================= */

self.addEventListener("push", event => {

  let data = {};

  try {

    data = event.data
      ? event.data.json()
      : {};

  } catch (error) {

    data = {
      title: "SM RAYHAN",
      body: event.data
        ? event.data.text()
        : "New notification"
    };

  }


  const title =
    data.title ||
    "SM RAYHAN";


  const options = {

    body:
      data.body ||
      "নতুন আপডেট এসেছে।",

    icon:
      data.icon ||
      "/app-icon.png",

    badge:
      data.badge ||
      "/app-icon.png",

    image:
      data.image ||
      undefined,

    data: {

      url:
        data.url ||
        "/"

    },

    vibrate: [
      200,
      100,
      200
    ],

    tag:
      data.tag ||
      "sm-rayhan-notification",

    renotify: true

  };


  event.waitUntil(

    self.registration.showNotification(
      title,
      options
    )

  );

});


/* =========================
   NOTIFICATION CLICK
========================= */

self.addEventListener(
  "notificationclick",
  event => {

    event.notification.close();


    const url =
      event.notification.data &&
      event.notification.data.url
        ? event.notification.data.url
        : "/";


    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      }).then(
        clientList => {

          for(
            const client of clientList
          ){

            if(
              "focus" in client
            ){

              client.navigate(url);

              return client.focus();

            }

          }


          if(
            clients.openWindow
          ){

            return clients.openWindow(url);

          }

        }
      )

    );

  }
);
