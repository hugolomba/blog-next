import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";

interface RichTextEditorProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <Editor
      key={isDarkMode ? "dark" : "light"}
      apiKey={process.env.NEXT_PUBLIC_RICH_TEXT_EDITOR_API_KEY}
      value={value}
      onEditorChange={(newValue) => onChange(newValue)}
      init={{
        skin: isDarkMode ? "oxide-dark" : "oxide",
        content_css: isDarkMode ? "dark" : "default",
        plugins: ["lists", "link"],
        toolbar:
          "undo redo| title | bold italic underline | bullist numlist | link",
        width: "100%",
      }}
      // initialValue={value}
    />
  );
}
