import { View, Text, TouchableOpacity } from "react-native";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
function MyTabBar({ state, descriptors, navigation }) {
  //   console.log("descriptors", JSON.stringify(descriptors));
  return (
    <View
      key={state.key}
      className="rounded-[24px] flex-row bg-white border-[1px] border-slate-200 py-1 mb-1 mx-1"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (isFocused && label === "New") {
            // navigation.navigate({ name: "Home", merge: true });
            navigation.goBack();
          } else if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          console.log("on long presssssssss");
          //   navigation.emit({
          //     type: "tabLongPress",
          //     target: route.key,
          //   });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            className="items-center"
            key={route.key}
          >
            {(() => {
              let iconName;
              if (label === "Home") {
                iconName = isFocused ? "home" : "home-outline";
              } else if (label === "My Routes") {
                iconName = isFocused
                  ? "map-marker-radius"
                  : "map-marker-radius-outline";
              } else if (label === "New") {
                iconName = isFocused ? "plus" : "plus";
              } else if (label === "Schedules") {
                iconName = isFocused
                  ? "calendar-multiselect"
                  : "calendar-multiselect";
              } else if (label === "Customers") {
                iconName = isFocused ? "face-man-profile" : "face-man-profile";
              }
              return label !== "New" ? (
                <View className="py-1 items-center justify-between">
                  <MatIcon
                    name={iconName}
                    size={24}
                    color={isFocused ? "#2389DA" : "gray"}
                  />
                  <Text
                    className="text-[10px]"
                    style={{ color: isFocused ? "#2389DA" : "gray" }}
                  >
                    {label}
                  </Text>
                </View>
              ) : (
                <View className="justify-between items-center">
                  <View
                    style={{
                      backgroundColor: isFocused ? "#2389DA" : "white",
                    }}
                    className={` ${
                      isFocused ? "rotate-45" : "rotate(0)"
                    } animate-bounce p-2 items-center mt-[-24px]  justify-center border-[1px] border-gray-200 rounded-full`}
                  >
                    <MatIcon
                      name="plus"
                      size={32}
                      color={isFocused ? "white" : "gray"}
                    />
                  </View>
                  <Text
                    className={`text-[10px] mt-[2px]`}
                    style={{
                      color: isFocused ? "#2389DA" : "gray",
                    }}
                  >
                    {label}
                  </Text>
                </View>
              );
            })()}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
export default React.memo(MyTabBar);
