import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import icon library

const MAX_CAPTION_LENGTH = 100; // Define max caption length for Read More

const TwitterCard = ({ caption, isLiked, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedCaption = isExpanded ? caption : caption.substring(0, MAX_CAPTION_LENGTH) + '...';

  return (
    <View style={styles.cardContainer}>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>{title}</Text>
      <Text style={styles.captionText}>{displayedCaption}</Text>
      {caption.length > MAX_CAPTION_LENGTH && (
        <TouchableOpacity onPress={handleReadMore} style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>{isExpanded ? 'Show Less' : 'Read More'}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.interactionBar}>
        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
          <FontAwesome
            name={isLiked ? 'heart' : 'heart-o'}
            size={20}
            color={isLiked ? 'red' : 'gray'}
          />
          <Text style={styles.likeText}>{isLiked ? 'Liked' : 'Like'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  captionText: {
    fontSize: 16,
  },
  readMoreButton: {
    marginTop: 5,
  },
  readMoreText: {
    color: 'blue',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 5,
  },
});

export default TwitterCard;