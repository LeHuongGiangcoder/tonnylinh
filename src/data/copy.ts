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

  intro: {
    hint: string;
    opened: string;
    /** The line shown over the dark before the film starts. */
    film: string;
    skip: string;
  };

  hero: {
    weddingOf: string;
    dear: string;
    /** Who the hero addresses when there is no personal link. */
    everyone: string;
    invitation: string;
  };

  gallery: {
    eyebrow: string;
    heading: string;
    prev: string;
    next: string;
    /** Under the album: how to leave a heart on a photo. */
    tapHint: string;
    /** Screen-reader label for a print's heart, followed by its number. */
    heart: string;
  };

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
    sending: string;
    error: string;
    thanksTitle: string;
    thanksBody: string;
    thanksBodyDecline: string;
  };

  honeymoon: {
    eyebrow: string;
    heading: string;
    body: string;
    account: string;
    /** Labels for the details a transfer from abroad needs. */
    bankNameEn: string;
    swift: string;
  };

  /** `and` joins the two names in the signature. */
  thanks: { eyebrow: string; heading: string; body: string; and: string };
};

const en: Copy = {
  langLabel: { en: "EN", vi: "VIE" },

  intro: {
    hint: "Press the seal",
    opened: "You are invited to our wedding",
    film: "Let's watch a little film of ours",
    skip: "Skip",
  },

  hero: {
    weddingOf: "The wedding of",
    dear: "Dear",
    everyone: "Our dear guest",
    invitation: "Together with our families, we joyfully invite you to our wedding",
  },

  gallery: {
    eyebrow: "Our Moments",
    heading: "Us, in pictures",
    prev: "Previous page",
    next: "Next page",
    tapHint: "tap a photo to leave a heart",
    heart: "Leave a heart on photo",
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
    sending: "Sending…",
    error: "Your reply didn't go through. Please try again in a moment.",
    thanksTitle: "Thank you",
    thanksBody: "Your reply is with us. We cannot wait to celebrate together on",
    thanksBodyDecline: "Your reply is with us. We will miss you, and we're grateful for your wishes.",
  },

  honeymoon: {
    eyebrow: "Honeymoon",
    heading: "Fund",
    body:
      "We're fortunate enough to have a home full of everything we need. If you would like to give us a wedding gift, we'd be very grateful to receive contributions towards our honeymoon, by scanning the QR code above.",
    account: "Or transfer to",
    bankNameEn: "Bank name (English)",
    swift: "SWIFT / BIC code",
  },

  thanks: {
    eyebrow: "With all our love",
    heading: "Thank You",
    body:
      "Your presence is the greatest gift of all. Thank you for being part of our story — and for standing with us as it turns a new page.",
    and: "and",
  },
};

const vi: Copy = {
  langLabel: { en: "EN", vi: "VIE" },

  intro: {
    hint: "Chạm vào dấu niêm",
    opened: "Trân trọng kính mời bạn đến dự lễ cưới",
    film: "Hãy cùng xem một thước phim ngắn của chúng mình nhé",
    skip: "Bỏ qua",
  },

  hero: {
    weddingOf: "Lễ thành hôn của",
    dear: "Kính gửi",
    everyone: "Quý khách thân mến",
    invitation: "Cùng gia đình hai bên, chúng mình kính mời bạn đến chung vui ngày cưới",
  },

  gallery: {
    eyebrow: "Khoảnh khắc",
    // Broken after "của" (see .heading--lines).
    heading: "Album ảnh của\nchúng mình",
    prev: "Trang trước",
    next: "Trang tiếp theo",
    tapHint: "chạm vào ảnh để thả tim",
    heart: "Thả tim cho ảnh",
  },

  details: {
    eyebrow: "Lưu lại ngày này",
    // The line break is kept (see .heading--lines): "& Địa điểm" on its own line.
    heading: "Thời gian\n& Địa điểm",
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
      "Chúng mình rất mong bạn có thể chọn trang phục theo bảng màu sắc bên dưới để chúng mình cùng lên hình được đẹp nhất nhé.",
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
    sending: "Đang gửi…",
    error: "Phản hồi chưa gửi được. Bạn thử lại sau giây lát nhé.",
    thanksTitle: "Cảm ơn bạn",
    thanksBody:
      "Chúng mình đã nhận được phản hồi của bạn. Hẹn gặp bạn trong ngày",
    thanksBodyDecline:
      "Chúng mình đã nhận được phản hồi của bạn. Tiếc vì không gặp được bạn, cảm ơn lời chúc của bạn nhiều nhé.",
  },

  honeymoon: {
    eyebrow: "Quỹ",
    heading: "Tuần trăng mật",
    body:
      "Tổ ấm của chúng mình đã có đủ mọi thứ cần thiết. Nếu bạn muốn gửi quà cưới, chúng mình rất biết ơn nếu được bạn góp một phần cho chuyến trăng mật, bằng cách quét mã QR phía trên.",
    account: "Hoặc chuyển khoản tới",
    bankNameEn: "Tên ngân hàng (tiếng Anh)",
    swift: "Mã SWIFT / BIC",
  },

  thanks: {
    eyebrow: "Thương mến",
    heading: "Cảm ơn bạn",
    body:
      "Sự hiện diện của bạn là món quà quý giá nhất. Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình — và đồng hành cùng chúng mình cho hành trình mới.",
    and: "và",
  },
};

export const copy: Record<Lang, Copy> = { en, vi };
