function extractRangeAttributes(class_ = "slider-time",
                                labels = ["Min", "H", "D", "W", "M"],
                                n_ticks = 5,
                                value_map = {
                                    1: "Minute",
                                    2: "Hour",
                                    3: "Day",
                                    4: "Week",
                                    5: "Month"
                                }
) {
    //the slider will update data-link=class_ values with the value or the mapped value if defined
    $("." + class_).each(function () {
        const this_ = this
        if (!$(this).hasClass("ui-slider")) {
            $(this).slider({
                range: "min",
                value: Math.floor(n_ticks / 2 + 1),
                min: 1,
                max: n_ticks,
                step: 1,
                slide: function (event, ui) {
                    // search for closest data-type="time-interval" and update its value
                    var queryFrame = $(this_).closest('.query-frame');
                    var elementsWithDatasetAttribute = queryFrame.find('[data-type="time-interval"]');
                    console.log(class_, ui.value)

                    queryFrame.find('[data-link=' + class_ + ']').val(labels[ui.value - 1]);

                    if (value_map[ui.value] === undefined) {
                        return
                    } else (
                        queryFrame.find('[data-link=' + class_ + ']').val(value_map[ui.value])
                    )
                    elementsWithDatasetAttribute[0].innerText = value_map[ui.value];
                }
            });
        }


    });
    // create the tickz
    sliders = document.getElementsByClassName(class_)
    slider = sliders[sliders.length - 1]

    const ticks = slider.nextElementSibling

    if (ticks.hasChildNodes()) {
        return
    }
    //append grid 2 lines 5 columns
    flexContainer = document.createElement("div")
    flexContainer.classList.add("flex-container")
    flexContainer.style.display = "flex"
    flexContainer.style.marginRight = -100 / (n_ticks - 0.9) + "%"

    const flexContainer2 = flexContainer.cloneNode(true)

    flexItem = document.createElement("div")
    flexItem.classList.add("flex-item")
    flexItem.style.flex = "1";
    flexItem.style.border = "None";
    flexItem.style.height = "10px";
    flexItem.style.verticalAlign = "top";
    flexItem.style.overflowY = "hidden";
    flexItem.innerHTML = "<div class='vl'> </div>"

    for (i in labels) {
        var label = labels[i]
        var flexItem2 = flexItem.cloneNode(true)
        flexItem2.innerHTML = "<div>" + label + "</div>"
        flexItem2.style.overflowY = "visible";
        flexContainer2.appendChild(flexItem2)
    }
    for (i = 0; i < n_ticks; i++) {
        flexContainer.appendChild(flexItem.cloneNode(true))
    }
    ticks.appendChild(flexContainer)
    flexContainer2.style.marginLeft = -100 / (labels.length - 1) / 2 + "%"
    flexContainer2.style.marginRight = -100 / (labels.length - 1) / 2 + "%"
    flexContainer2.style.textAlign = "center"
    ticks.appendChild(flexContainer2)
}

function get_slider_values(element) {
    var queryFrame = element.closest('.query-frame');
    console.log(queryFrame);

    // Use [0] to get the first element or convert NodeList to an array
    var nStations = queryFrame.querySelectorAll('[data-link="slider-stations"]')[0].value;
    var nTime = queryFrame.querySelectorAll('[data-link="slider-time"]')[0].value;
    var nSensors = queryFrame.querySelectorAll('[data-link="slider-sensors"]')[0].value;

    return {stations: parseInt(nStations), time: nTime, sensors: parseInt(nSensors)};
}