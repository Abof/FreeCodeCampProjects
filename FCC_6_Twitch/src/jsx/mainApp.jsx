/* CODEPEN SETUP */
$.ajaxSetup({
  cache: false
});

/* MAIN APP FLOW / CONTROL*/
$(document).ready(function() {
  ReactDOM.render(
    <TodoElement value = "TODO: Whole Twitch App! "/>,
    document.getElementById('test_root')
  );
});
