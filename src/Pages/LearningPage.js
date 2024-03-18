import React, { useState } from "react";
import { StyleSheet, ScrollView, Text } from 'react-native';
import TwitterCard from "../Components/TwitterCard";

export default function LearningPage({ navigation }) {
  const data = "Disasters can be scary, but a little knowledge goes a long way! Let\'s talk earthquakes. When the ground starts shaking, DROP, COVER, and HOLD ON! DROP to the ground where you are. COVER your head and neck under a sturdy table or desk. HOLD ON to the furniture until the shaking stops. Bonus tip: If there\'s no furniture nearby, curl up on the ground and protect your head and neck with your arms. Remember, stay calm and be prepared!";
  const data1 = "Floods can be sneaky and dangerous. Here's how to stay safe:Stay Informed: Pay attention to weather reports and flood warnings. Have an Evacuation Plan: Know your evacuation route and have a meeting spot outside flood zones. Fill Sandbags (if applicable): Protect your doorways from floodwaters if you have time. Move Important Items Upstairs: Lift belongings to higher floors to avoid water damage. Don\'t Drive Through Floodwaters: Just a few inches can be dangerous. Find another route! Remember, floods can happen quickly. Be prepared and stay safe!";
  const data2 = "Hurricanes can pack a punch, but being prepared can make a big difference. Here's the lowdown: Stock Up: Gather a hurricane kit with non-perishable food, water, first aid supplies, and a battery-powered radio. Know Your Zone: Local authorities will issue evacuation orders based on your zone. Find out yours beforehand! Board Up Windows: Plywood helps protect windows from flying debris. Bring in Outdoor Furniture: Loose objects become dangerous projectiles in high winds. Charge Devices: Keep your phone and electronics charged for critical updates. Remember, hurricanes can cause power outages and flooding. Be prepared and stay informed!";
  const data3 = "Wildfires can move fast, but knowing what to do can save lives. Here are some quick tips: Be Fire Aware: Clear brush and debris around your home to create a firebreak. Have an Evacuation Plan: Plan escape routes and designate a meeting place outside the fire zone. Stay Informed: Sign up for local alerts and monitor fire danger conditions. Assemble a Go-Bag: Pack essentials like medications, important documents, and a change of clothes. Listen to Officials: Follow evacuation orders promptly and stay on designated routes. Remember, wildfires can be unpredictable. Be prepared and stay alert!";

  return (
    <ScrollView style={styles.container}>
      <TwitterCard title={"Earthquake Safety in 30 Seconds!"} caption={data} isLiked={true}/>
      <TwitterCard title={"Flood Safety in a Snap!"} caption={data1} isLiked={true}/>
      <TwitterCard title={"Hurricane Prep in a Pinch!"} caption={data2} isLiked={true}/>
      <TwitterCard title={"Wildfire Awareness in a Hurry!"} caption={data3} isLiked={true}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

