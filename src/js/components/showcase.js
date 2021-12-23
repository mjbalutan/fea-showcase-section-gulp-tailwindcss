var Showcase = {
    parentDiv: document.getElementById("fea_showcase_grid"),
    items: [
        {
            headline: "ben & jerry's",
            imageUrl: "./images/1.png",
            description: "Responsive Loyalty Site Digital Menus"
        },
        {
            headline: "zambrero",
            imageUrl: "./images/2.png",
            description: "Responsive Loyalty Site Digital Menus"
        },
        {
            headline: "snap kitchen",
            imageUrl: "./images/3.png",
            description: "Responsive Loyalty Site Digital Menus"
        },
        {
            headline: "rubio's",
            imageUrl: "./images/4.png",
            description: "Responsive Loyalty Site Digital Menus"
        }
    ],

    buildTemplate: function (data) {

        var html = '';

        for (var i in data) {

            html += (
                '<div class="grid-item">' +
                    '<div class="fea-showcase-card" style="background-image: url('
                    + data[i].imageUrl + ')">' +
                        '<div class="fea-showcase-overlay">' +
                            '<div class="fea-showcase-content">' +
                                '<h3>' + data[i].headline + '</h3>' +
                                '<p>' + data[i].description + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );

        }
    
        return html;
    },
    render: function () {

        var self = this;

        self.parentDiv.innerHTML = self.buildTemplate(self.items);

    }
};