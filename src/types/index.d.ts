export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  description: string;
  image: string;
  button: Button;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export type File = {
  id: number;
  title: string;
  content: string;
  translatedContent: string;
  timestamp: string;
  dateCreated: string;
  documentStyle: DocumentStyle;
  documentMachine: string;
  deadline: string;
  status: number;
}

export type Task =  {
  taskName: any;
  id: number;
  name: string;
  context: string;
  message: string;
  assignor: {
    username: string;
    role: string;
  };
  receiver: {
    username: string;
    role: string;
  };
  document: File;
  status: int;
}

export type DocumentStyle = {
  ops: Op[]; // Array of 'Op' objects
}

export type Op =  {
  insert: string; // Assuming each 'insert' is a string
}

export type TextContentProps = {
  fileId: number;
  title: string;
  initText: string;
  initMachine:string;
  initTranslateText: string;
  onBackButtonClick: () => void;
}

export type Message = {
  messageId: number;
  senderId: number;
  receiverId: number;
  text: string;
  createdAt: string;
  senderUsername: string;
  receiverUsername: string;
}