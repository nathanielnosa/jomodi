import React, { useState } from 'react';
import { Container, Text, Divider, Button, Rating, Badge } from '@mantine/core';

const RatingReview = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmitReview = () => {
        if (rating === 0 || review.trim() === '') {
            return;
        }

        const newReview = { rating, review };
        setReviews([...reviews, newReview]);
        setRating(0);
        setReview('');
    };

    return (
        <Container size="sm">
            <Text size="xl" align="center" style={{ marginBottom: '1rem' }}>
                Product Reviews and Ratings
            </Text>

            <Divider style={{ margin: '1rem 0' }} />

            <Text size="lg" weight={600} style={{ marginBottom: '0.5rem' }}>
                Leave a Review
            </Text>

            <Rating value={rating} onChange={handleRatingChange} />

            <Text
                placeholder="Write your review..."
                value={review}
                onChange={handleReviewChange}
                style={{ margin: '0.5rem 0' }}
            />

            <Button size="sm" variant="outline" onClick={handleSubmitReview}>
                Submit Review
            </Button>

            <Divider style={{ margin: '1rem 0' }} />

            <Text size="lg" weight={600} style={{ marginBottom: '0.5rem' }}>
                Product Reviews
            </Text>

            {reviews.map((review, index) => (
                <div key={index} style={{ marginBottom: '0.5rem' }}>
                    <Badge color={review.rating >= 4 ? 'teal' : 'red'} style={{ marginRight: '0.5rem' }}>
                        {review.rating} Stars
                    </Badge>
                    {review.review}
                </div>
            ))}
        </Container>
    );
};

export default RatingReview;
