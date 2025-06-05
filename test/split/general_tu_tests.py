# test_turkic
    def test_turkic(self):
        # Turkish has dotted and dotless I/i.
        pairs = "I=i;I=\u0131;i=\u0130"

        all_chars = set()
        matching = set()
        for pair in pairs.split(";"):
            ch1, ch2 = pair.split("=")
            all_chars.update((ch1, ch2))
            matching.add((ch1, ch1))
            matching.add((ch1, ch2))
            matching.add((ch2, ch1))
            matching.add((ch2, ch2))

        for ch1 in all_chars:
            for ch2 in all_chars:
                m = regex.match(r"(?i)\A" + ch1 + r"\Z", ch2)
                if m:
                    if (ch1, ch2) not in matching:
                        self.fail("{} matching {}".format(ascii(ch1),
                          ascii(ch2)))
                else:
                    if (ch1, ch2) in matching:
                        self.fail("{} not matching {}".format(ascii(ch1),
                          ascii(ch2)))
