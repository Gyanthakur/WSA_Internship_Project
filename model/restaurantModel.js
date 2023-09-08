const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      default: 'patna',
    },
    info: Object,
    parentId: String,
    avgRatingString: String,
    totalRatingsString: String,
    sla: Object,
    availability: Object,
    badges: Object,
    isOpen: Boolean,
    type: String,
    badgesV2: Object,
    aggregatedDiscountInfoV3: Object,
    orderabilityCommunication: Object,
    differentiatedUi: Object,
    reviewsSummary: Object,
    displayType: String,
    restaurantOfferPresentationInfo: Object,
    analytics: Object,
    cta: Object,
    widgetId: String,
  },
  {
    timestamps: true,
  }
);

const Restaurant =
  mongoose.models.restaurant || mongoose.model('restaurants', restaurantSchema);

module.exports = Restaurant;
