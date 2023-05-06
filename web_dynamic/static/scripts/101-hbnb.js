$(document).ready(function() {
  const reviewsUrl = "http://0.0.0.0:5001/api/v1/places/<PLACE_ID>/reviews";

  $("span#toggle_reviews").click(function() {
    const button = $(this);
    if (button.text() === "hide") {
      $("div#review_list").empty();
      button.text("Show");
    } else {
      $.get(reviewsUrl, function(data, status) {
        if (status === "success") {
          data.forEach((review) => {
            $("div#review_list").append(`
              <article>
                <h3>From ${review.user_first_name} ${review.user_last_name}:</h3>
                <p>${review.text}</p>
              </article>
            `);
          });
          button.text("Hide");
        }
      });
    }
  });
});
