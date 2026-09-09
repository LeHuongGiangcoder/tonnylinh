import type { agenda, palette } from "./wedding";

/**
 * Every word a guest reads, in both languages.
 *
 * `Copy` is declared rather than inferred, so both dictionaries are checked
 * against the same shape: adding a line in one language and forgetting it in
 * the other is a compile error, not a blank on the page. The agenda and
 * palette keys are pulled off the data itself, so a new event or a new colour
 * cannot ship without both translations.
 */

export const LANGUAGES = ["en", "vi"] as const;
export type Lang = (typeof LANGUAGES)[number];

type EventId = (typeof agenda)[number]["id"];
type ColourId = (typeof palette)[number]["id"];

export type Copy = {
  /** Shown on the language switch itself — never translated. */
  langLabel: Record<Lang, string>;

  intro: { hint: string; opened: string };

  hero: {
    dear: string;
    invitation: string;
  };

  gallery: { eyebrow: string; heading: string; note: string; placeholder: string };

  details: {
    eyebrow: string;
    heading: string;
    day: string;
    place: string;
    date: string;
    address: string;
    map: string;
  };

  agenda: {
    eyebrow: string;
    heading: string;
    month: string;
    /** Seven, in the same order as `weddingWeek.dates`. */
    days: readonly string[];
    events: Record<EventId, string>;
  };

  dresscode: {
    eyebrow: string;
    heading: string;
    note: string;
    description: string;
    colours: Record<ColourId, string>;
  };

  rsvp: {
    eyebrow: string;
    heading: string;
    deadline: string;
    name: string;
    namePlaceholder: string;
    contact: string;
    contactPlaceholder: string;
    attending: string;
    yes: string;
    no: string;
    guests: string;
    diet: string;
    dietPlaceholder: string;
    help: string;
    helpHotel: string;
    helpTransport: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    thanksTitle: string;
    thanksBody: string;
  };

  thanks: { eyebrow: string; heading: string; body: string };
};

const en: Copy = {
  langLabel: { en: "EN", vi: "VIE" },

  intro: {
    hint: "Press the seal",
    opened: "You are invited",
  },

  hero: {
    dear: "Dear",
    invitation: "Together with our families, we joyfully invite you to our wedding",
  },

  gallery: {
    eyebrow: "Our Moments",
    heading: "Us, in pictures",
    note: "Our photographs are on their way — this space is waiting for them.",
    placeholder: "Photo",
  },

  details: {
    eyebrow: "Save the Date",
    heading: "Time & Venue",
    day: "The Day",
    place: "The Place",
    date: "Sunday, 6 December 2026",
    address: "Thuận An, Bình Dương",
    map: "View on map",
  },

  agenda: {
    eyebrow: "The Programme",
    heading: "Order of the Day",
    month: "December 2026",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    events: {
      welcome: "Welcome Guests",
      ceremony: "Wedding Ceremony",
      cocktail: "Cocktail Hour",
      dinner: "Dinner",
      show: "Mini Show",
      party: "After Party",
    },
  },

  dresscode: {
    eyebrow: "What to Wear",
    heading: "Dress Code",
    note: "Formal & Elegant",
    description:
      "We would love to see you in the four shades of our day. Please avoid white and bright red so our couple portraits stay unmistakably ours.",
    colours: {
      black: "Black",
      chocolate: "Chocolate Brown",
      burgundy: "Burgundy",
      olive: "Olive Green",
    },
  },

  rsvp: {
    eyebrow: "Will you join us?",
    heading: "R.S.V.P.",
    deadline: "Please reply before 6 November 2026",
    name: "Your name",
    namePlaceholder: "Full name",
    contact: "Phone or email",
    contactPlaceholder: "So we can reach you",
    attending: "Will you attend?",
    yes: "Joyfully accept",
    no: "Regretfully decline",
    guests: "Number of guests",
    diet: "Dietary requirements",
    dietPlaceholder: "Allergies, vegetarian, or any diet we should know about",
    help: "Would you like help with a hotel or with getting there?",
    helpHotel: "Hotel suggestions",
    helpTransport: "Getting there",
    message: "A note for us",
    messagePlaceholder: "Your wishes for the couple",
    submit: "Send my reply",
    thanksTitle: "Thank you",
    thanksBody: "Your reply is with us. We cannot wait to celebrate together on",
  },

  thanks: {
    eyebrow: "With all our love",
    heading: "Thank You",
    body:
      "Your presence is the greatest gift of all. Thank you for being part of our story — and for standing with us as it turns a new page.",
  },
};

const vi: Copy = {
  langLabel: { en: "EN", vi: "VIE" },

  intro: {
    hint: "Chạm vào dấu niêm",
    opened: "Trân trọng kính mời",
  },

  hero: {
    dear: "Kính gửi",
    invitation: "Cùng gia đình hai bên, chúng mình kính mời bạn đến chung vui ngày cưới",
  },

  gallery: {
    eyebrow: "Khoảnh khắc",
    heading: "Chúng mình, qua ảnh",
    note: "Ảnh của chúng mình sắp về — chỗ này đang chờ sẵn.",
    placeholder: "Ảnh",
  },

  details: {
    eyebrow: "Lưu lại ngày này",
    heading: "Thời gian & Địa điểm",
    day: "Ngày cưới",
    place: "Địa điểm",
    date: "Chủ Nhật, ngày 6 tháng 12 năm 2026",
    address: "Thuận An, Bình Dương",
    map: "Xem bản đồ",
  },

  agenda: {
    eyebrow: "Chương trình",
    heading: "Trình tự buổi lễ",
    month: "Tháng 12, 2026",
    days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    events: {
      welcome: "Đón khách",
      ceremony: "Lễ thành hôn",
      cocktail: "Tiệc nhẹ",
      dinner: "Tiệc tối",
      show: "Tiết mục đặc biệt",
      party: "Tiệc sau",
    },
  },

  dresscode: {
    eyebrow: "Trang phục",
    heading: "Dress Code",
    note: "Lịch sự & Trang nhã",
    description:
      "Chúng mình rất mong được thấy bạn trong bốn sắc màu của ngày hôm ấy. Xin bạn tránh màu trắng và đỏ tươi để những khung hình của cô dâu chú rể luôn nổi bật.",
    colours: {
      black: "Đen",
      chocolate: "Nâu sô-cô-la",
      burgundy: "Đỏ rượu vang",
      olive: "Xanh ô liu",
    },
  },

  rsvp: {
    eyebrow: "Bạn sẽ đến chứ?",
    heading: "Xác nhận tham dự",
    deadline: "Vui lòng phản hồi trước ngày 6 tháng 11 năm 2026",
    name: "Tên của bạn",
    namePlaceholder: "Họ và tên",
    contact: "Điện thoại hoặc email",
    contactPlaceholder: "Để chúng mình liên lạc với bạn",
    attending: "Bạn có tham dự không?",
    yes: "Rất vui được tham dự",
    no: "Tiếc là mình không đến được",
    guests: "Số lượng khách",
    diet: "Yêu cầu ăn uống",
    dietPlaceholder: "Dị ứng, ăn chay, hoặc chế độ ăn kiêng",
    help: "Bạn có cần gợi ý khách sạn hoặc phương tiện di chuyển không?",
    helpHotel: "Gợi ý khách sạn",
    helpTransport: "Phương tiện di chuyển",
    message: "Lời nhắn cho chúng mình",
    messagePlaceholder: "Lời chúc dành cho cô dâu chú rể",
    submit: "Gửi phản hồi",
    thanksTitle: "Cảm ơn bạn",
    thanksBody:
      "Chúng mình đã nhận được phản hồi của bạn. Hẹn gặp bạn trong ngày",
  },

  thanks: {
    eyebrow: "Thương mến",
    heading: "Cảm ơn bạn",
    body:
      "Sự hiện diện của bạn là món quà quý giá nhất. Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình — và đồng hành cùng chúng mình sang trang mới.",
  },
};

export const copy: Record<Lang, Copy> = { en, vi };
