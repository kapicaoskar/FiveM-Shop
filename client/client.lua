-- Example Command
RegisterCommand("oskarshop", function()
TriggerEvent("oskarshop:open")
end)
-- Example Command


RegisterNetEvent("oskarshop:open")
AddEventHandler("oskarshop:open", function ()
    SendNUIMessage({
        type = "OPEN_SHOP",
        shopLogo = Config.ShopLogo,
        shopName = Config.ServerName,
        shopItems = json.encode(Config.ShopItems),
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback("openBasket", function ()
    SetNuiFocus(false,false)
    --Your pay system trigger
end)


RegisterNUICallback("exitShop", function ()
    SetNuiFocus(false,false)
end)



RegisterNUICallback("addBasket", function (data)
    local itemName = data.itemName
    local category = data.category
    for i=1, #Config.ShopItems do   
        local shopItems = Config.ShopItems[i]
        if shopItems.name == category then  
            for i=2, #shopItems.items do
                local shopItem = shopItems.items[i]
                if shopItem.previewName == itemName then
                    print(shopItem.price)
                    print(shopItem.itemPhoto)
                    -- link your pay system or basket
                end
            end
        end
    end 
end)


