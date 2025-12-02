$(function () {
    const currency = (value) => value.toLocaleString("id-ID");
    const sliderMin = 50000;
    const sliderMax = 8000000;

    const $priceSlider = $("#priceSlider");
    const $priceLabel = $("#priceLabel");
    const $cartDialog = $("#cartDialog");
    const $cartItems = $("#cartItems");
    const $cartTotal = $("#cartTotal");

    let cart = [];

    $cartDialog.dialog({
        autoOpen: false,
        modal: true,
        width: 420,
        show: { effect: "fade", duration: 200 },
        hide: { effect: "fade", duration: 200 }
    });

    $("#cartButton").on("click", function () {
        $cartDialog.dialog("open");
    });

    $priceSlider.slider({
        range: true,
        min: sliderMin,
        max: sliderMax,
        values: [50000, 3000000],
        slide: function (_event, ui) {
            updatePriceLabel(ui.values);
            filterByPrice(ui.values);
        },
        change: function (_event, ui) {
            filterByPrice(ui.values);
        }
    });

    updatePriceLabel($priceSlider.slider("values"));
    filterByPrice($priceSlider.slider("values"));
    filterByCategory("all");

    $(".category-bar button").on("click", function () {
        $(".category-bar button").removeClass("active");
        $(this).addClass("active");
        const category = $(this).data("category");
        filterByCategory(category);
    });

    $(".add-to-cart").on("click", function () {
        const $card = $(this).closest(".product-card");
        const name = $card.find("h3").text();
        const price = $card.data("price");

        cart.push({ name, price });
        updateCart();
        $cartDialog.dialog("open");
    });

    function updatePriceLabel([min, max]) {
        $priceLabel.text(`Rp ${currency(min)} - Rp ${currency(max)}`);
    }

    function filterByPrice([min, max]) {
        $(".product-card").each(function () {
            const price = $(this).data("price");
            $(this).toggleClass("is-hidden", price < min || price > max);
        });
    }

    function filterByCategory(category) {
        $(".product-card").each(function () {
            const cardCategory = $(this).data("category");
            const hidden = category !== "all" && cardCategory !== category;
            $(this).toggleClass("category-hidden", hidden);
        });
    }

    function updateCart() {
        $cartItems.empty();

        if (!cart.length) {
            $("<li>").addClass("empty").text("Keranjang masih kosong").appendTo($cartItems);
            $cartTotal.text("0");
            return;
        }

        let total = 0;
        cart.forEach((item) => {
            $("<li>")
                .append(`<span>${item.name}</span>`)
                .append(`<span>Rp ${currency(item.price)}</span>`)
                .appendTo($cartItems);
            total += item.price;
        });

        $cartTotal.text(currency(total));
    }
});
